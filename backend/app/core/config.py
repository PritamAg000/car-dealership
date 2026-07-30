import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Car Dealership Inventory System"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = "sqlite:///./car_dealership.db"
    JWT_SECRET_KEY: str = "super-secret-jwt-key-change-in-production-123456789"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
