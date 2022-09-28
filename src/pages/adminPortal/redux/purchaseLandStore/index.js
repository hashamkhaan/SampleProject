// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const defaultDate = moment().format('DD/MM/YY');
export const addProjectSlice = createSlice({
	name: 'PurchasingLandDetails',
	initialState: {
		data: {
			form1: {
				file_no: '',
				land_category_id: '1',
				date: defaultDate,
				purchasers: [],
				agents: [],
				mouza: null,
				khasra: [],
				north: '',
				south: '',
				east: '',
				west: '',
				rate_per_marla: '',
				totalPrice: '',
				Area: '',
				block: '',
				street: '',
				zilla: '',
				province: '',
				tehsil: '',
				description: '',
				file_name: '',
				initialKanal: '',
				initialMarla: '',
				initialSarsai: '',
				initialFeet: '',
				inteqal_bezubani: false,
			},

			stages: [
				{
					id: 0,
					stage_id: 1,
					amount: '',
					stage_date: defaultDate,
					description: '',
					file: '',
				},
				{
					id: 1,
					stage_id: 2,
					amount: '',
					stage_date: defaultDate,
					description: '',
					file: '',
				},
				{
					id: 2,
					stage_id: 3,
					amount: '',
					stage_date: defaultDate,
					description: '',
					file: '',
				},
				{
					id: 3,
					stage_id: 4,
					amount: '',
					stage_date: defaultDate,
					description: '',
					file: '',
				},
				{
					id: 4,
					stage_id: 5,
					amount: '',
					stage_date: defaultDate,
					description: '',
					file: '',
				},
				{
					id: 5,
					stage_id: 6,
					amount: '',
					stage_date: defaultDate,
					description: '',
					file: '',
				},
			],
			payments: [],
			taxes: [],
			expenses: [],
			khasra_record: [],
			registries: [],
			installments: [],
			validations: {
				form1Isvalid: false,
			},
			editLand: 0,
			masterDetails: {
				count_stages: 5,
				count_payments: 0,
				count_khasra: 0,
				count_taxes: 0,
				count_expenses: 0,
				count_registries: 0,
				count_installments: 0,
				temp: 0,
				refreshDropdowns: 0,
				isEnabledNext1: false,
			},
		},
		media: {
			registries: [],
		},
	},

	reducers: {
		updateRegistriesMedia: (state, action) => {
			// checking if Stage exist, but floor exist anyways so check is not needed

			// e,          action.payload[0]
			// 'Stage'     action.payload[1]
			// , i         action.payload[2]
			// 'stageParam' action.payload[3]

			return {
				...state,
				media: {
					...state.media,
					[action.payload[1]]: [
						...state.media[action.payload[1]].slice(0, action.payload[2]),
						{
							...state.media[action.payload[1]][action.payload[2]],
							[action.payload[3]]: action.payload[0],
						},
						...state.media[action.payload[1]].slice(action.payload[2] + 1),
					],
				},
			};
		},
		updateWholeObject: (state, action) => {
			const data = action.payload;
			return {
				data,
			};
		},
		updateMasterDetails: (state, action) => {
			return {
				...state,
				data: {
					...state.data,
					masterDetails: {
						...state.data.masterDetails,
						[action.payload[1]]: action.payload[0],
					},
				},
			};
		},
		// eslint-disable-next-line no-unused-vars
		resetStore: (state, action) => {
			return {
				data: {
					form1: {
						file_no: '',
						land_category_id: '1',
						date: defaultDate,
						purchasers: [],
						agents: [],
						mouza: null,
						khasra: [],
						north: '',
						south: '',
						east: '',
						west: '',
						rate_per_marla: '',
						totalPrice: '',
						Area: '',
						block: '',
						street: '',
						zilla: '',
						province: '',
						tehsil: '',
						description: '',
						file_name: '',
						initialKanal: '',
						initialMarla: '',
						initialSarsai: '',
						initialFeet: '',
						inteqal_bezubani: false,
					},

					stages: [
						{
							id: 0,
							stage_id: 1,
							amount: '',
							stage_date: defaultDate,
							description: '',
							file: '',
						},
						{
							id: 1,
							stage_id: 2,
							amount: '',
							stage_date: defaultDate,
							description: '',
							file: '',
						},
						{
							id: 2,
							stage_id: 3,
							amount: '',
							stage_date: defaultDate,
							description: '',
							file: '',
						},
						{
							id: 3,
							stage_id: 4,
							amount: '',
							stage_date: defaultDate,
							description: '',
							file: '',
						},
						{
							id: 4,
							stage_id: 5,
							amount: '',
							stage_date: defaultDate,
							description: '',
							file: '',
						},
						{
							id: 5,
							stage_id: 6,
							amount: '',
							stage_date: defaultDate,
							description: '',
							file: '',
						},
					],
					payments: [],
					taxes: [],
					expenses: [],
					khasra_record: [],
					registries: [],
					installments: [],
					validations: {
						form1Isvalid: false,
					},
					editLand: 0,
					masterDetails: {
						count_stages: 5,
						count_payments: 0,
						count_khasra: 0,
						count_taxes: 0,
						count_expenses: 0,
						count_registries: 0,
						count_installments: 0,
						temp: 0,
						refreshDropdowns: 0,
						isEnabledNext1: false,
					},
				},
				media: {
					registries: [],
				},
			};
		},
		temp: (state, action) => {
			return {
				...state,
				data: {
					...state.data,

					[action.payload[1]]: action.payload[0],
				},
			};
		},
		updateForm1Properties: (state, action) => {
			return {
				...state,
				data: {
					...state.data,
					form1: {
						...state.data.form1,
						[action.payload[1]]: action.payload[0],
					},
				},
			};
		},
		updateFormIsValid: (state, action) => {
			return {
				...state,
				data: {
					...state.data,
					validations: {
						...state.data.validations,
						[action.payload[1]]: action.payload[0],
					},
				},
			};
		},
		updateForm: (state, action) => {
			return {
				...state,
				data: {
					...state.data,
					[action.payload[1]]: action.payload[0],
				},
			};
		},
		updateFormDetails: (state, action) => {
			return {
				...state,
				data: {
					...state.data,
					[action.payload[2]]: {
						...state.data[action.payload[2]],
						[action.payload[1]]: action.payload[0],
					},
				},
			};
		},
		updateNoOfStages: (state, action) => {
			let cond = false;

			// eslint-disable-next-line prefer-destructuring
			cond = action.payload[3];

			return {
				...state,
				data: {
					...state.data,
					masterDetails: {
						...state.data.masterDetails,

						...(cond
							? {
									[action.payload[1]]:
										state.data.masterDetails[action.payload[1]] - 1,
							  }
							: {
									[action.payload[1]]:
										state.data.masterDetails[action.payload[1]] + 1,
							  }),
					},
					...(cond
						? {
								[action.payload[2]]: state.data[action.payload[2]].slice(0, -1),
						  }
						: {
								[action.payload[2]]: [
									...state.data[action.payload[2]],
									{
										id: state.data.masterDetails[action.payload[1]],
										stage_id: state.data.masterDetails[action.payload[1]] + 1,
										amount: '',
										stage_date: state.data.form1.date,
										description: '',
										file: '',
									},
								],
						  }),
				},
			};
		},
		updateNoOfPayemnts: (state, action) => {
			let cond = false;

			// eslint-disable-next-line prefer-destructuring
			cond = action.payload[3];

			return {
				...state,
				data: {
					...state.data,
					masterDetails: {
						...state.data.masterDetails,

						...(cond
							? {
									[action.payload[1]]:
										state.data.masterDetails[action.payload[1]] - 1,
							  }
							: {
									[action.payload[1]]:
										state.data.masterDetails[action.payload[1]] + 1,
							  }),
					},
					...(cond
						? {
								[action.payload[2]]: state.data[action.payload[2]].slice(0, -1),
						  }
						: {
								[action.payload[2]]: [
									...state.data[action.payload[2]],
									{
										id: state.data.masterDetails[action.payload[1]],

										date: state.data.form1.date,
										description: '',
										transaction_type_id: '2',
										paid_status: true,
										amount: '',
										payer: null,
										payee_seller: null,
										payee_agent: null,
									},
								],
						  }),
				},
			};
		},
		updateNoOfRegistries: (state, action) => {
			let cond = false;

			// eslint-disable-next-line prefer-destructuring
			cond = action.payload[3];

			return {
				...state,
				data: {
					...state.data,
					masterDetails: {
						...state.data.masterDetails,

						...(cond
							? {
									[action.payload[1]]:
										state.data.masterDetails[action.payload[1]] - 1,
							  }
							: {
									[action.payload[1]]:
										state.data.masterDetails[action.payload[1]] + 1,
							  }),
					},
					...(cond
						? {
								[action.payload[2]]: state.data[action.payload[2]].slice(0, -1),
						  }
						: {
								[action.payload[2]]: [
									...state.data[action.payload[2]],
									{
										id: state.data.masterDetails[action.payload[1]],

										date: state.data.form1.date,
										description: '',
										dc_value: '',
										number: '',
										person_name_purchaser: [],
										person_name_seller: [],
										file: '',
									},
								],
						  }),
				},
			};
		},
		updateStageProperties: (state, action) => {
			// checking if Stage exist, but floor exist anyways so check is not needed

			// e,          action.payload[0]
			// 'Stage'     action.payload[1]
			// , i         action.payload[2]
			// 'stageParam' action.payload[3]

			return {
				...state,
				data: {
					...state.data,
					[action.payload[1]]: [
						...state.data[action.payload[1]].slice(0, action.payload[2]),
						{
							...state.data[action.payload[1]][action.payload[2]],
							[action.payload[3]]: action.payload[0],
						},
						...state.data[action.payload[1]].slice(action.payload[2] + 1),
					],
				},
			};
		},
		updateNoOfInstallments: (state, action) => {
			let cond = false;

			// eslint-disable-next-line prefer-destructuring
			cond = action.payload[3];

			return {
				...state,
				data: {
					...state.data,
					masterDetails: {
						...state.data.masterDetails,

						...(cond
							? {
									[action.payload[1]]:
										state.data.masterDetails[action.payload[1]] - 1,
							  }
							: {
									[action.payload[1]]:
										state.data.masterDetails[action.payload[1]] + 1,
							  }),
					},
					...(cond
						? {
								[action.payload[2]]: state.data[action.payload[2]].slice(0, -1),
						  }
						: {
								[action.payload[2]]: [
									...state.data[action.payload[2]],
									{
										id: state.data.masterDetails[action.payload[1]],

										date: state.data.form1.date,
										amount: '',
										balance: '',
									},
								],
						  }),
				},
			};
		},
		updatePaymentProperties: (state, action) => {
			// checking if Stage exist, but floor exist anyways so check is not needed

			// e,          action.payload[0]
			// 'Stage'     action.payload[1]
			// , i         action.payload[2]
			// 'stageParam' action.payload[3]

			return {
				...state,
				data: {
					...state.data,
					[action.payload[1]]: [
						...state.data[action.payload[1]].slice(0, action.payload[2]),
						{
							...state.data[action.payload[1]][action.payload[2]],
							[action.payload[3]]: action.payload[0],
						},
						...state.data[action.payload[1]].slice(action.payload[2] + 1),
					],
				},
			};
		},
		updateStagesRegistriesFile: (state, action) => {
			// checking if Stage exist, but floor exist anyways so check is not needed

			// e,          action.payload[0]
			// 'Stage'     action.payload[1]
			// , i         action.payload[2]
			// 'stageParam' action.payload[3]
			const formData = new FormData();
			formData.append('uploadFile', action.payload[0]);
			return {
				...state,
				data: {
					...state.data,
					[action.payload[1]]: [
						...state.data[action.payload[1]].slice(0, action.payload[2]),
						{
							...state.data[action.payload[1]][action.payload[2]],

							[action.payload[3]]: formData,
							[action.payload[4]]: action.payload[0],
						},
						...state.data[action.payload[1]].slice(action.payload[2] + 1),
					],
				},
			};
		},
		updateNoOfKhasra: (state, action) => {
			// action.payload[4] cuurent khasra id
			let cond = false;

			const ind = state.data[action.payload[2]].findIndex(
				(_item) => _item.id === action.payload[0] - 1,
			);
			if (ind > -1 || action.payload[0] === 0) {
				cond = false;
			} else {
				cond = true;
			}
			return {
				...state,
				data: {
					...state.data,
					masterDetails: {
						...state.data.masterDetails,
						[action.payload[1]]: action.payload[0],
					},
					...(cond
						? {
								[action.payload[2]]: [
									...state.data[action.payload[2]],
									{
										id: action.payload[0] - 1,
										label: `${action.payload[3]}-${action.payload[0]}`,
										khasra_id: action.payload[4],
										khasra_number: action.payload[5],

										Tkanal: action.payload[6],
										Tmarla: action.payload[7],
										Tsarsai: action.payload[8],
										Tfeet: action.payload[9],
										kanal: '',
										marla: '',
										sarsai: '',
										feet: '',
										khewat: '',
										khatoni: '',
										cleared_land_count: 0,
										cleared_land: [],
										registries: [],
									},
								],
						  }
						: {
								[action.payload[2]]: state.data[action.payload[2]].slice(0, -1),
						  }),
				},
			};
		},
		updateKhasraCleared_land_count: (state, action) => {
			//  e          action.payload[0]
			// i           action.payload[1],
			// cleared_land_count  action.payload[2]
			// cleared_land  action.payload[3]
			// khasra_record  action.payload[4]
			// true/false  action.payload[6]
			const cond = action.payload[6];

			return {
				...state,
				data: {
					...state.data,
					[action.payload[4]]: [
						...state.data[action.payload[4]].slice(0, action.payload[1]),
						{
							...state.data[action.payload[4]][action.payload[1]],
							...(cond
								? {
										[action.payload[2]]:
											state.data.khasra_record[action.payload[1]][
												action.payload[2]
											] + 1,
										[action.payload[3]]: [
											...state.data[action.payload[4]][action.payload[1]][
												action.payload[3]
											],
											{
												id: state.data.khasra_record[action.payload[1]][
													action.payload[2]
												],
											},
										],
								  }
								: {
										[action.payload[2]]:
											state.data.khasra_record[action.payload[1]][
												action.payload[2]
											] - 1,
										[action.payload[3]]: state.data[action.payload[4]][
											action.payload[1]
										][action.payload[3]].slice(0, -1),
								  }),
						},
						...state.data[action.payload[4]].slice(action.payload[1] + 1),
					],
				},
			};
		},
		updatekhasra_recordProperties: (state, action) => {
			// checking if floor exist, but floor exist anyways so check is not needed

			// e,          action.payload[0]
			// 'floors/basement'     action.payload[1]
			// , i         action.payload[2]
			// 'floorparam' action.payload[3]

			return {
				...state,
				data: {
					...state.data,
					[action.payload[1]]: [
						...state.data[action.payload[1]].slice(0, action.payload[2]),
						{
							...state.data[action.payload[1]][action.payload[2]],
							[action.payload[3]]: action.payload[0],
						},
						...state.data[action.payload[1]].slice(action.payload[2] + 1),
					],
				},
			};
		},
		updatekhasra_recordPropertiesSizeInKhasra: (state, action) => {
			// checking if floor exist, but floor exist anyways so check is not needed

			// e,          action.payload[0]
			// 'floors/basement'     action.payload[1]
			// , i         action.payload[2]
			// 'floorparam' action.payload[3]

			return {
				...state,
				data: {
					...state.data,
					[action.payload[1]]: [
						...state.data[action.payload[1]].slice(0, action.payload[2]),
						{
							...state.data[action.payload[1]][action.payload[2]],
							[action.payload[3]]: action.payload[0],
							[action.payload[4]]: action.payload[5],
							[action.payload[6]]: action.payload[7],
							[action.payload[8]]: action.payload[9],
						},
						...state.data[action.payload[1]].slice(action.payload[2] + 1),
					],
				},
			};
		},

		updatekhasra_recordInnerProperties: (state, action) => {
			// checking if floor exist, but floor exist anyways so check is not needed

			// e,                action.payload[0]
			// 'floors/basement    action.payload[1]
			// , i                action.payload[2]
			// 'floorparam'       action.payload[3]
			// 'floorParamIndex'       action.payload[4]
			// 'innerparam'       action.payload[5]

			return {
				...state,
				data: {
					...state.data,
					[action.payload[1]]: [
						...state.data[action.payload[1]].slice(0, action.payload[2]),
						{
							...state.data[action.payload[1]][action.payload[2]],
							[action.payload[3]]: [
								...state.data[action.payload[1]][action.payload[2]][
									action.payload[3]
								].slice(0, action.payload[4]),
								{
									...state.data[action.payload[1]][action.payload[2]][
										action.payload[3]
									][action.payload[4]],
									[action.payload[5]]: action.payload[0],
								},
								...state.data[action.payload[1]][action.payload[2]][
									action.payload[3]
								].slice(action.payload[4] + 1),
							],
						},
						...state.data[action.payload[1]].slice(action.payload[2] + 1),
					],
				},
			};
		},

		updateFloorNoOfShopEtc: (state, action) => {
			//  e          action.payload[0]
			// i           action.payload[1],
			// Floorparam  action.payload[2]
			// InnerParam  action.payload[3]
			// Floor/Basement  action.payload[4]
			let cond = false;
			const ind = state.data[action.payload[4]][action.payload[1]][
				action.payload[3]
			].findIndex((_item) => _item.id === action.payload[0] - 1);
			if (ind > -1 || action.payload[0] === 0) {
				cond = false;
			} else {
				cond = true;
			}

			return {
				...state,
				data: {
					...state.data,
					[action.payload[4]]: [
						...state.data[action.payload[4]].slice(0, action.payload[1]),
						{
							...state.data[action.payload[4]][action.payload[1]],
							[action.payload[2]]: action.payload[0],
							...(cond
								? {
										[action.payload[3]]: [
											...state.data[action.payload[4]][action.payload[1]][
												action.payload[3]
											],
											{
												id: action.payload[0] - 1,
												label: `${action.payload[5]}-${action.payload[0]}`,
												status: 'Available',
												monthlyPlan: true,
												quarterPlan: false,
												qmPlan: false,
												amPlan: false,
											},
										],
								  }
								: {
										[action.payload[3]]: state.data[action.payload[4]][
											action.payload[1]
										][action.payload[3]].slice(0, -1),
								  }),
						},
						...state.data[action.payload[4]].slice(action.payload[1] + 1),
					],
				},
			};
		},
		updateKhasraInnerProperties: (state, action) => {
			// checking if floor exist, but floor exist anyways so check is not needed

			// e,                action.payload[0]
			// 'floors/basement    action.payload[1]
			// , i                action.payload[2]
			// 'floorparam'       action.payload[3]
			// 'floorParamIndex'       action.payload[4]
			// 'innerparam'       action.payload[5]

			return {
				...state,
				data: {
					...state.data,
					[action.payload[1]]: [
						...state.data[action.payload[1]].slice(0, action.payload[2]),
						{
							...state.data[action.payload[1]][action.payload[2]],
							[action.payload[3]]: [
								...state.data[action.payload[1]][action.payload[2]][
									action.payload[3]
								].slice(0, action.payload[4]),
								{
									...state.data[action.payload[1]][action.payload[2]][
										action.payload[3]
									][action.payload[4]],
									[action.payload[5]]: action.payload[0],
								},
								...state.data[action.payload[1]][action.payload[2]][
									action.payload[3]
								].slice(action.payload[4] + 1),
							],
						},
						...state.data[action.payload[1]].slice(action.payload[2] + 1),
					],
				},
			};
		},
		updateKhasraRecord: (state, action) => {
			return {
				...state,
				data: {
					...state.data,

					[action.payload[1]]: action.payload[0],
				},
			};
		},
	},
});

export const {
	updateMasterDetails,
	updateForm,
	updateWholeObject,
	updateFormIsValid,
	updateFormDetails,
	updateStageProperties,
	updateNoOfStages,
	updateNoOfKhasra,
	// eslint-disable-next-line camelcase
	updatekhasra_recordProperties,
	// eslint-disable-next-line camelcase
	updatekhasra_recordInnerProperties,
	// eslint-disable-next-line camelcase
	updateKhasraCleared_land_count,
	updateKhasraInnerProperties,
	updatePaymentProperties,
	updateNoOfPayemnts,
	updateForm1Properties,
	updateNoOfRegistries,
	updateKhasraRecord,
	updateNoOfInstallments,
	updateStagesRegistriesFile,
	updateRegistriesMedia,
	// eslint-disable-next-line camelcase
	updatekhasra_recordPropertiesSizeInKhasra,
	resetStore,
	temp,
} = addProjectSlice.actions;
export default addProjectSlice.reducer;
