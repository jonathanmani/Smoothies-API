async function deleteSmoothie(){
    const sName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteSmoothie', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'nameS': sName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}