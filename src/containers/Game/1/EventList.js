import { store } from 'index'

import { setEvent } from 'actions/event'

export const die_1 = (history) => {
  dialogCall(history, '/game/1/play/d_die_1', "die_1")
}

export const die_real = (history) => {
  history.push('/dead')
}

export const huge_cave = (history) => {
  dialogCall(history, '/game/1/play/d_huge_cave', "huge_cave")
}

export const bones = (history) => {
  dialogCall(history, '/game/1/play/d_bones', "bones")
}

export const omg = (history) => {
  dialogCall(history, '/game/1/play/d_omg', "omg")
}

export const unending = (history) => {
  dialogCall(history, '/game/1/play/d_unending', "unending")
}

export const passTrap = (history) => {
  dialogCall(history, '/game/1/play/d_passTrap', "passTrap")
}

export const looksLikeTrap = (history) => {
  dialogCall(history, '/game/1/play/d_looksLikeTrap', "looksLikeTrap")
}

export const needCareful = (history) => {
  dialogCall(history, '/game/1/play/d_needCareful', "needCareful")
}

export const pattern = (history) => {
  dialogCall(history, '/game/1/play/d_pattern', "pattern")
}

export const prepare = (history) => {
  dialogCall(history, '/game/1/play/d_prepare', "prepare")
}

export const lotsOfEffort = (history) => {
  dialogCall(history, '/game/1/play/d_lotsOfEffort', "lotsOfEffort")
}

export const readTrap = (history) => {
  setEvent("readTrap");
}

export const stepOnTrap = (history) => {
  history.push('/dead')
}

export const stepOnPlotTrap = (history) => {
  const storeData = store.getState();
  if(!storeData.event.readTrap){
    history.push('/dead')
  }
}

export const trapIsVisible = (history) => {
  const storeData = store.getState();
  if(!storeData.event.readTrap){
    return 0;
  }
  return 1
}

export const movingTrapIsCurrent = (num) => (history) => {
  const storeData = store.getState();
  if(storeData.movement.step === num){
    return 1
  }
  return 0;
}

function dialogCall(history, dialogUrl, name){
  const storeData = store.getState();
  if(!storeData.event[name]){
    history.push(dialogUrl)
    setEvent(name);
  }
}
