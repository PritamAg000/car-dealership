"""add image_url column to vehicles table

Revision ID: cd23cb5beab1
Revises: 6d1a9cb47ad7
Create Date: 2026-07-30 14:48:33.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cd23cb5beab1'
down_revision: Union[str, None] = '6d1a9cb47ad7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('vehicles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.String(length=500), nullable=True))


def downgrade() -> None:
    with op.batch_alter_table('vehicles', schema=None) as batch_op:
        batch_op.drop_column('image_url')
