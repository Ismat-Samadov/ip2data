"""Conductor — Bakı ictimai nəqliyyat Graph RAG API."""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from conductor.config import APP_HOST, APP_PORT
from conductor.graph.client import Neo4jClient
from conductor.api.routes import router, init_services


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    client = Neo4jClient()
    client.verify_connectivity()
    init_services(client)
    print("Conductor API ready.")
    yield
    # Shutdown
    client.close()
    print("Neo4j connection closed.")


app = FastAPI(
    title="Conductor",
    description="Bakı ictimai nəqliyyat köməkçisi — Graph RAG API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("conductor.main:app", host=APP_HOST, port=int(APP_PORT), reload=True)
