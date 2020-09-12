export const delay = time => {
  return new Promise(resolve => { 
      setTimeout(resolve, time*1000*60)
  });
}