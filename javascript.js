const thedays = ['mon','tue','wed','thu','fri','sat','sun']
let bigctn = document.querySelector('.graph_cont')
let prxs = []
let max = 0
let somme = 0



function showprx(x){
    document.querySelector('.prx#'+x).style.visibility = 'visible';
}
function removeprx(x){
    document.querySelector('.prx#'+x).style.visibility = 'hidden';
}

fetch("data.json")
  .then(response => response.json())
  .then(json => {
        for (ob of json){
            let amount = +ob['amount']
            prxs.push(amount)
            if (max< amount){max = amount}
            somme += amount
        }
        
        for (let i = 0;i<7;i++) {
            let ctn = document.createElement("div");
            let prx = document.createElement("div");
            prx.className='prx';
            prx.id= thedays[i];
            prx.innerHTML= '$'+ prxs[i];
            ctn.appendChild(prx);
            
            let graph = document.createElement("div");
            graph.className = "graph "+ thedays[i];
            graph.id = thedays[i];
            let hght = (prxs[i]*150)/max;
            graph.style.height = hght + 'px'
            graph.addEventListener('mouseover',function(){showprx(this.id)})
            graph.addEventListener('mouseout',function(){removeprx(this.id)})
            ctn.appendChild(graph);

            let nom = document.createElement('p')
            nom.innerHTML = thedays[i];
            ctn.appendChild(nom);
            

            bigctn.appendChild(ctn)
        }
        
        const ndx = prxs.indexOf(max);
        document.querySelector('.graph.'+thedays[ndx]).style.backgroundColor = 'hsl(186, 34%, 60%)'
    });

