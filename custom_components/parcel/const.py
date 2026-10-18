"""Constants for the Parcel integration."""

from __future__ import annotations

from datetime import timedelta
from typing import Final

DOMAIN: Final = "parcel"
VERSION: Final = "0.1.0"

API_BASE: Final = "https://api.parcel.app/external"
API_DELIVERIES: Final = f"{API_BASE}/deliveries/"
API_ADD_DELIVERY: Final = f"{API_BASE}/add-delivery/"
API_CARRIERS: Final = f"{API_BASE}/supported_carriers.json"

CONF_FILTER_MODE: Final = "filter_mode"
FILTER_ACTIVE: Final = "active"
FILTER_RECENT: Final = "recent"
DEFAULT_FILTER_MODE: Final = FILTER_RECENT

# The deliveries endpoint allows 20 requests per hour: never poll faster than every 5 minutes.
CONF_SCAN_INTERVAL: Final = "scan_interval"
DEFAULT_SCAN_INTERVAL: Final = 10
MIN_SCAN_INTERVAL: Final = 5
CARRIERS_REFRESH: Final = timedelta(hours=24)

SERVICE_ADD_DELIVERY: Final = "add_delivery"
SERVICE_REFRESH: Final = "refresh"

ATTR_CONFIG_ENTRY_ID: Final = "config_entry_id"
ATTR_TRACKING_NUMBER: Final = "tracking_number"
ATTR_CARRIER_CODE: Final = "carrier_code"
ATTR_DESCRIPTION: Final = "description"
ATTR_LANGUAGE: Final = "language"
ATTR_SEND_PUSH_CONFIRMATION: Final = "send_push_confirmation"
ATTR_POSTCODE: Final = "postcode"
ATTR_EMAIL: Final = "email"

STATUS_COMPLETED: Final = 0

# Parcel status_code -> stable key, translated by the card.
STATUS_KEYS: Final = {
    0: "delivered",
    1: "frozen",
    2: "in_transit",
    3: "awaiting_pickup",
    4: "out_for_delivery",
    5: "not_found",
    6: "failed_attempt",
    7: "exception",
    8: "info_received",
}

FRONTEND_URL: Final = "/parcel_static"
CARD_FILENAME: Final = "parcel-card.js"
