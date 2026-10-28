// Start the correct room plates while the application code is still loading.
// This small same-origin script runs under the existing script-src policy.
(()=>{
 let saved;try{saved=localStorage.getItem('saved-summer:period');}catch{}
 const hour=new Date().getHours();
 const phase=['morning','day','evening','night'].includes(saved)?saved:hour>=5&&hour<11?'morning':hour>=11&&hour<17?'day':hour>=17&&hour<21?'evening':'night';
 for(const file of [`room-layered-${phase}-v1.webp`,`room-objects-${phase}-v1.webp`,'couple-wall-v2-room.webp']){
  const link=document.createElement('link');link.rel='preload';link.as='image';link.href=`/assets/${file}`;link.fetchPriority='high';document.head.append(link);
 }
})();
