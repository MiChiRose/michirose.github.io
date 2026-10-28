// Start the correct room plates while the application code is still loading.
// This small same-origin script runs under the existing script-src policy.
(()=>{
 let saved;try{saved=localStorage.getItem('saved-summer:period');}catch{}
 const hour=new Date().getHours();
 let phase=['morning','day','evening','night'].includes(saved)?saved:hour>=5&&hour<11?'morning':hour>=11&&hour<17?'day':hour>=17&&hour<21?'evening':'night';
 // A remembered wet morning uses the neutral daylight plate, like the renderer.
 let weather;try{weather=localStorage.getItem('saved-summer:weather');const city=JSON.parse(localStorage.getItem('saved-summer:weather-city'))||{latitude:53.90019,longitude:27.56653};const cache=JSON.parse(localStorage.getItem('saved-summer:weather-cache'));if((!weather||weather==='live')&&cache?.key===`${city.latitude},${city.longitude}`&&Date.now()-cache.at>=0&&Date.now()-cache.at<7200000){const c=cache.current;if(c&&Number.isFinite(c.code)&&Number.isFinite(c.cloud)&&(c.code>=45||c.code===3||c.cloud>=70))weather='rain';}}catch{}
 if(phase==='morning'&&['rain','storm','snow','blizzard','fog','cloudy'].includes(weather))phase='day';
 for(const file of [`room-layered-${phase}-${phase==='day'?'v2':'v1'}.webp`,`room-objects-${phase}-${phase==='day'?'v2':'v1'}.webp`,'couple-wall-v2-room.webp']){
  const link=document.createElement('link');link.rel='preload';link.as='image';link.href=`/assets/${file}`;link.fetchPriority='high';document.head.append(link);
 }
})();
