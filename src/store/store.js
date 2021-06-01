import Vue from 'vue'
import Vuex from 'vuex'
import simulateAsyncReq from "@/plugins/getDataFunc";
import {payload} from "@/mocData";

Vue.use(Vuex)
const normalizeNumber = (number, flag)=> {
    const res = number.toFixed(2)
    if (flag)  return res >= 0 ? '+' + res : res
    return res
}

export default new Vuex.Store({
    state: {
        stocksData: {} ,
        formatedStocksData:[],
        stocksDataError: false
    },
    getters:{
        getStockData(state){
            return state.stocksData
        },
        getFormatStocksData(state) {
            return state.formatedStocksData
        },
        getStocksDataError(state){
            return state.stocksDataError
        }
    },
    mutations: {
        SET_STOCK_DATA(state, payload) {
            state.stocksData = payload
        },
        SET_FORMATED_STOCKS_DATA(state, payload) {
            const arr = []
            if (!payload) {
                const maxLength = Math.max(state.stocksData.stocks.length, state.stocksData.start.length, state.stocksData.current.length)

                for (let i = 0; i < maxLength; i++) {
                    arr.push({
                        stocks: state.stocksData.stocks[i],
                        current: normalizeNumber(state.stocksData.current[i]),
                        change: normalizeNumber(state.stocksData.start[i].toFixed(2) - state.stocksData.current[i].toFixed(2), true)
                    })
                }
            }
            arr.sort((a,b)=> {
                return a.stocks.localeCompare(b.stocks);
            })
            state.formatedStocksData = payload ? payload : arr
        },
        SET_STOKS_DATA_ERROR(state, payload){
            state.stocksDataError = payload
        }
    },
    actions: {
        async getData({commit}) {
            try {
                commit('SET_STOKS_DATA_ERROR', false)
                const stocksData = await simulateAsyncReq(payload)
                commit('SET_STOCK_DATA', stocksData)
                commit('SET_FORMATED_STOCKS_DATA')
            } catch (err){
                commit('SET_STOKS_DATA_ERROR', true)
                commit('SET_FORMATED_STOCKS_DATA', [])
                console.log('error data',err)
            }
        }
    }
})