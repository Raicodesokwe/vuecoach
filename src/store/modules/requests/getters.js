export default{
    messages(state,_,_2,rootGetters) {
        const coachId=rootGetters.userId;
        return state.messages.filter(req=>req.coachId===coachId)
    },
    hasMessages(_,getters){
        return getters.messages && getters.messages.length > 0
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
        }
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60
    }
}