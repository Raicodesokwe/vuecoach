import mutations from "../requests/mutations"
import actions from "../requests/actions"
import getters from "../requests/getters"



export default {
    namespaced: true,
    state() {
        return {
            lastFetch:null,
            messages: []
        }
    },
    mutations,
    actions,
    getters
    
}