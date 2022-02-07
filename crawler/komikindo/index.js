const axios = require('axios');

axios
.post('http://127.0.0.1:8000/api/crawler/tmp-link',{
    data:[
            {
                link: "komikindo.comasdas",
                source: 'komikindo'
            }
    ]
 
}).then(res =>{
    console.log(res.data);
}).catch(err => {
    console.log(err);
})