// helper script for updating slide-16 labels (for dev preview)
(function(){
  function labelFor(indicatorIndex, status){
    switch(indicatorIndex){
      case 1:
      case 3:
      case 5:
        if(status==='bad') return 'Kritis';
        if(status==='warn') return 'Parah';
        if(status==='mid') return 'Sedang';
        if(status==='good') return 'Pulih';
        return '';
      case 6:
        return status==='good' ? 'Normal' : 'Kelembaban Tinggi';
      case 4:
        if(status==='bad') return 'Terputus';
        if(status==='good') return 'Pulih';
        return 'Tergenang';
      case 2:
        if(status==='bad') return 'Redup';
        if(status==='warn') return 'Mulai Pulih';
        if(status==='mid') return 'Mendekati Normal';
        if(status==='good') return 'Melebihi Baseline';
        return '';
      default:
        return '';
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    const provinces = document.querySelectorAll('.matrix .province');
    provinces.forEach((prov)=>{
      let node = prov;
      for(let i=1;i<=6;i++){
        node = node.nextElementSibling;
        if(!node) break;
        const cls = Array.from(node.classList).find(c=>c.startsWith('status-')) || '';
        const status = cls.replace('status-','');
        const label = labelFor(i, status);
        if(label) node.textContent = label;
      }
    });
  });
})();
