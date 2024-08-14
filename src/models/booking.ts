import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';
import User from './user';
import Speaker from './speaker';

interface BookingAttributes {
    id: number;
    userId: number;
    speakerId: number;
    date: string;
    timeSlot: string;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id'> { }

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
    public id!: number;
    public userId!: number;
    public speakerId!: number;
    public date!: string;
    public timeSlot!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:User,
                key:'id',
            }
        },
        speakerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:Speaker,
                key:'id',
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        timeSlot: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Booking',
    }
);

Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Booking.belongsTo(Speaker, { foreignKey: 'speakerId', as: 'speaker' });

export default Booking;
