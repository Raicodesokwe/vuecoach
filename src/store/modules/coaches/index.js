import mutations from './mutations';
import actions from './actions';
import getters from './getters';


export default {
    namespaced: true,
    state() {
        return {
            lastFetch:null,
            coaches: [
                {
                  id: 'c1',
                  firstName: 'Makuro',
                  lastName: 'Mahuru',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    "I'm Makuro and I've worked as a freelance sex developer for years. Let me help you become a sexpert as well!",
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'Julie',
                  lastName: 'Jones',
                  areas: ['frontend', 'career'],
                  description:
                    'I am Julie and as a senior sexpert in a big sex company, I can help you get your first blowjob or progress in your current role.',
                  hourlyRate: 30
                }
              ]
        }
    },
    mutations,
    actions,
    getters
}