module.exports = (state = {energy: 30}, action) => {
  switch (action.type) {
    case 'USE_ENERGY':
      return {...state, energy: state.energy - 1};
    case 'SET_ENERGY':
      return {...state, energy: action.energy};
    case 'ADD_ENERGY':
      return {...state, energy: state.energy + action.energy > 150 ? 150 : state.energy + action.energy};
    default:
      return state;
  }
};
