"""Small async client for the Parcel external API."""

from __future__ import annotations

from typing import Any

import aiohttp

from .const import API_ADD_DELIVERY, API_CARRIERS, API_DELIVERIES

TIMEOUT = aiohttp.ClientTimeout(total=30)


class ParcelError(Exception):
    """Generic Parcel API error."""


class ParcelAuthError(ParcelError):
    """The API key was rejected."""


class ParcelRateLimitError(ParcelError):
    """The API rate limit was reached."""


class ParcelApi:
    """Parcel API client."""

    def __init__(self, session: aiohttp.ClientSession, api_key: str) -> None:
        self._session = session
        self._api_key = api_key

    async def _request(self, method: str, url: str, **kwargs: Any) -> dict[str, Any]:
        headers = {"api-key": self._api_key}
        try:
            async with self._session.request(
                method, url, headers=headers, timeout=TIMEOUT, **kwargs
            ) as resp:
                if resp.status == 429:
                    raise ParcelRateLimitError("Parcel API rate limit reached")
                if resp.status in (401, 403):
                    raise ParcelAuthError("Invalid Parcel API key")
                try:
                    data = await resp.json(content_type=None)
                except ValueError as err:
                    raise ParcelError(f"Invalid response from Parcel (HTTP {resp.status})") from err
        except aiohttp.ClientError as err:
            raise ParcelError(f"Cannot reach Parcel: {err}") from err

        if not isinstance(data, dict):
            raise ParcelError("Unexpected response from Parcel")
        if not data.get("success", False):
            message = str(data.get("error_message") or f"HTTP {resp.status}")
            lowered = message.lower()
            if "api key" in lowered or "api-key" in lowered or "unauthorized" in lowered:
                raise ParcelAuthError(message)
            if "limit" in lowered:
                raise ParcelRateLimitError(message)
            raise ParcelError(message)
        return data

    async def get_deliveries(self, filter_mode: str) -> list[dict[str, Any]]:
        """Return the deliveries for the account."""
        data = await self._request("GET", API_DELIVERIES, params={"filter_mode": filter_mode})
        deliveries = data.get("deliveries") or []
        return [d for d in deliveries if isinstance(d, dict)]

    async def add_delivery(self, payload: dict[str, Any]) -> None:
        """Add one delivery to Parcel."""
        await self._request("POST", API_ADD_DELIVERY, json=payload)

    async def get_carriers(self) -> dict[str, str]:
        """Return the supported carriers as {code: name}."""
        try:
            async with self._session.get(API_CARRIERS, timeout=TIMEOUT) as resp:
                resp.raise_for_status()
                data = await resp.json(content_type=None)
        except (aiohttp.ClientError, ValueError) as err:
            raise ParcelError(f"Cannot load Parcel carriers: {err}") from err

        if isinstance(data, dict):
            return {str(code): str(name) for code, name in data.items()}
        if isinstance(data, list):
            carriers: dict[str, str] = {}
            for item in data:
                if isinstance(item, dict) and "code" in item:
                    carriers[str(item["code"])] = str(item.get("name") or item["code"])
            return carriers
        raise ParcelError("Unexpected carriers list format")
