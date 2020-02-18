import Sequelize from "sequelize";
import { CommandResponse } from "../../typeDefinitions";
import { ErrorCodeLookup } from "../../lookups/stringLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import * as MarkersRepository from "../models/entities/MarkersModel";
import { MarkersModel } from "../models/entities/MarkersModel";

export let execute = (id?: string): Promise<CommandResponse<void>> => {
	if ((id == null) || (id.trim() === "")) {
		return Promise.resolve(<CommandResponse<void>>{ status: 204 });
	}

	let deleteTransaction: Sequelize.Transaction;

	return DatabaseConnection.startTransaction()
		.then((startedTransaction: Sequelize.Transaction): Promise<MarkersModel | null> => {
			deleteTransaction = startedTransaction;

			return MarkersRepository.queryById(id, deleteTransaction);
		}).then((queriedMarker: (MarkersModel | null)): Promise<void> => {
			if (queriedMarker == null) {
				return Promise.resolve();
			}

			return MarkersRepository.destroy(queriedMarker, deleteTransaction);
		}).then((): Promise<CommandResponse<void>> => {
			deleteTransaction.commit();

			return Promise.resolve(<CommandResponse<void>>{ status: 204 });
		}).catch((error: any): Promise<CommandResponse<void>> => {
			if (deleteTransaction != null) {
				deleteTransaction.rollback();
			}

			return Promise.reject(<CommandResponse<void>>{
				status: (error.status || 500),
				message: (error.message || ErrorCodeLookup.EC1003)
			});
		});
};