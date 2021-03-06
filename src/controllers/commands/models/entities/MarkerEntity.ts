import Sequelize from "sequelize";
import { DatabaseConnection } from "../databaseConnection";
import { DatabaseTableName } from "../constants/databaseTableNames";
import { MarkersFieldName } from "../constants/fieldNames/markerFiledNames";
import { Model, DataTypes, InitOptions, ModelAttributes, ModelAttributeColumnOptions } from "sequelize";
export interface MarkerAttributes {
	id: string;
	MarkerID: number;
	Temperature: number;
	precipChance: number;
	Latitude: number;
	Longitude: number;
	location: string;
	ArrivalTime: Date;
}
export interface MarkerInstance {
	id: string;
	MarkerID: number;
	Temperature: number;
	precipChance: number;
	Latitude: number;
	Longitude: number;
	location: string;
	ArrivalTime: Date;
}
export class MarkerEntity extends Model {
	public MarkerID!: number;
	public Temperature!: number;
	public precipChance!: number;
	public Latitude!: number;
	public Longitude!: number;
	public location!: string;
	public readonly id!: string;
	public readonly ArrivalTime!: Date;

}
export interface UserInstance {
	id: string;
}

MarkerEntity.init(
	<ModelAttributes>{
		id: <ModelAttributeColumnOptions>{
			field: MarkersFieldName.ID,
			type: DataTypes.UUID,
			autoIncrement: true,
			primaryKey: true

		},
		MarkerID: <ModelAttributeColumnOptions>{
			field: MarkersFieldName.MarkerID,
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		ArrivalTime: <ModelAttributeColumnOptions>{
			field: MarkersFieldName.ArrivalTime,
			type: new DataTypes.DATE(),
			allowNull: true
		},
		Temperature: <ModelAttributeColumnOptions>{
			field: MarkersFieldName.Temperature,
			type: new DataTypes.INTEGER,
			allowNull: true,
		},
		Latitude: <ModelAttributeColumnOptions>{
			field: MarkersFieldName.Latitude,
			type: new DataTypes.DECIMAL,
		},
		Longitude: <ModelAttributeColumnOptions>{
			field: MarkersFieldName.Longitude,
			type: new DataTypes.DECIMAL,
		},
		precipChance: <ModelAttributeColumnOptions>{
			field: MarkersFieldName.precipChance,
			type: new DataTypes.INTEGER,
			allowNull: true,
		},
		location: <ModelAttributeColumnOptions>{
			field: MarkersFieldName.location,
			type: new DataTypes.STRING(32)
		}
	}, <InitOptions>{
		timestamps: false,
		freezeTableName: true,
		sequelize: DatabaseConnection,
		tableName: DatabaseTableName.MARKERS
	});



export const queryById = async (id: string, queryTransaction?: Sequelize.Transaction): Promise<MarkerEntity[]> => {
	return MarkerEntity.findAll(<Sequelize.FindOptions>{
		transaction: queryTransaction,
		where: { id: id }
	});
};
export const getAllID = async (id: string, queryTransaction?: Sequelize.Transaction): Promise<MarkerEntity[]> => {
	return MarkerEntity.findAll(<Sequelize.FindOptions>{
		attributes: [ id, "MarkersID"]
	});
};
export const queryByMarkerID = async (MarkerID: number, queryTransaction?: Sequelize.Transaction): Promise<MarkerEntity | null> => {
	return MarkerEntity.findOne(<Sequelize.FindOptions>{
		transaction: queryTransaction,
		where: <Sequelize.WhereOptions>{ MarkerID: MarkerID }
	});
};

export const queryAll = async (): Promise<MarkerEntity[]> => {
	return MarkerEntity.findAll(<Sequelize.FindOptions>{
		id: [ [MarkersFieldName.ArrivalTime, "ASC"] ]
	});
};
export const queryByAllUserId = (id: string): Promise<MarkerInstance[]> => {
	return MarkerEntity.findAll(<Sequelize.FindOptions>{
		where:<Sequelize.WhereOptions>{ id: id}
	});
};
export const searchAll = async (query: string): Promise<MarkerEntity[]> => {
	return MarkerEntity.findAll(<Sequelize.FindOptions>{
		where: {
			id: [ query]
		}
	});
};

export const created = async (newMarker: MarkerEntity, createTransaction?: Sequelize.Transaction): Promise<MarkerEntity> => {
	return MarkerEntity.create(
		newMarker,
		<Sequelize.CreateOptions>{
			transaction: createTransaction
		});
};

export const destroy = async (markerListEntry: MarkerEntity, destroyTransaction?: Sequelize.Transaction): Promise<void> => {
	return markerListEntry.destroy(
		<Sequelize.InstanceDestroyOptions>{
			transaction: destroyTransaction
		});
};
