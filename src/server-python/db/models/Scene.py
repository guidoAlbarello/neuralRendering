from typing import Optional
from db.db import Base, engine
from utils.idcreator import create_id
from sqlalchemy import Column, String, JSON
from enum import Enum, auto

class SceneStatus(Enum):
    PENDING_TO_PROCESS = auto()
    PROCESSING = auto()
    PENDING_TO_SAVE_DATA = auto()
    PROCESSED = auto()
    FAILED_TO_PROCESS = auto()

class Scene(Base):
    __tablename__ = "scenes"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=True)
    description = Column(String, nullable=True)
    status = Column(String, nullable=False)
    processed_data = Column(JSON, nullable=True)

    def __init__(self, name: str, description: Optional[str]):
        self.id = create_id()
        self.status = str(SceneStatus.PENDING_TO_PROCESS.name)
        self.name = name
        self.description = description

    def __repr__(self):
        return f"Productos({self.nombre}, {self.categoria}, {self.precio})"

    def __str__(self):
        return self.id