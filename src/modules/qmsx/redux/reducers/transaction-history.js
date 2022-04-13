import {
  GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_START,
  GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
  GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
  GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
  GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL,
  GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START,
  GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS,
  GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL,
  GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START,
  GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS,
  GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
  GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
  RESET_TRANSACTION_HISTORY_STATE,
  SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_START,
  SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
  SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
  SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
  SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL,
  SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START,
  SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS,
  SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL,
  SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START,
  SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS,
  SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
  SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
} from '~/modules/qmsx/redux/actions/transaction-history'

const initialState = {
  isLoading: false,
  transactionHistoryInputList: [],
  transactionHistoryOutputList: [],
  transactionHistoryProductionOutputList: [],
  transactionHistoryProductPreviousList: [],
  transactionHistoryMaterialList: [],
  transactionHistoryDetail: null,
  orderList: [],
  total: null,
}

export default function transactionHistory(state = initialState, action) {
  switch (action.type) {
    /** Input quality transaction history **/
    case SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryInputList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryDetail: action?.payload,
        isLoading: false,
      }
    case GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Output quality transaction history **/
    case SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryOutputList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryDetail: action?.payload,
        isLoading: false,
        total: action?.payload?.total,
      }
    case GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Production output quality transaction history **/
    case SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryProductionOutputList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryDetail: action?.payload,
        isLoading: false,
      }
    case GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Production input quality (product of previous step) transaction history **/
    case SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryProductPreviousList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryDetail: action?.payload,
        isLoading: false,
      }
    case GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Production input quality (material) transaction history **/
    case SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryMaterialList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistoryDetail: action?.payload,
        isLoading: false,
      }
    case GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_TRANSACTION_HISTORY_STATE:
      return {
        ...state,
        transactionHistoryDetail: {},
      }
    default:
      return state
  }
}
