"""Pydantic request/response models for the API."""

from pydantic import BaseModel


class SessionStartRequest(BaseModel):
    latitude: float | None = None
    longitude: float | None = None


class SessionStartResponse(BaseModel):
    session_id: str
    greeting: str
    nearest_stops: list[dict] = []


class LocationUpdateRequest(BaseModel):
    session_id: str
    latitude: float
    longitude: float


class LocationUpdateResponse(BaseModel):
    nearest_stops: list[dict]


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str
    intent: str | None = None
    routes: list[dict] = []


class NearbyStopsResponse(BaseModel):
    stops: list[dict]


class BusInfoResponse(BaseModel):
    bus: dict | None = None
    stops: list[dict] = []
