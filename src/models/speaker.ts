import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

interface SpeakerAttributes {
    id: number;
    expertise: string;
    pricePerSession: number;
    userId: number;
}

interface SpeakerCreationAttributes extends Optional<SpeakerAttributes, 'id'> { }

class Speaker extends Model<SpeakerAttributes, SpeakerCreationAttributes> implements SpeakerAttributes {
    public id!: number;
    public expertise!: string;
    public pricePerSession!: number;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Speaker.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        expertise: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pricePerSession: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Speaker',
    }
);

export default Speaker;
