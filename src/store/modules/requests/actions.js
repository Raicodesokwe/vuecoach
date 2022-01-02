export default {
    async contactCoach(context, payload) {


        const messageData = {


            userEmail: payload.email,
            message: payload.message
        }
        const response = await fetch(`https://kundukumahani-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(messageData)
        });
        const responseData = await response.json();



        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to get info rynao');
            throw error
        }
        messageData.id = responseData.name
        messageData.coachId = payload.coachId
        context.commit('addMessage', messageData)
    },
    async loadRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response = await fetch(`https://kundukumahani-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`+token);
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to get info rynao');
            throw error
        }
        const messages = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            }
            messages.push(coach);
        }
        context.commit('setMessages', messages)
    }
}