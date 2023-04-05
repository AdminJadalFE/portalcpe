import React, { useState, useEffect } from 'react';

const VisorXML =  () => { 

    const xmlFile = 'https://jadalfecpeqa.s3.amazonaws.com/20534760583-01-FP99-00000001.xml';

    const [xmlContent, setXmlContent] = useState(null);

    useEffect(() => {
      fetch(xmlFile)
        .then((response) => response.text())
        .then((data) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'application/xml');
          setXmlContent(xmlDoc);
        });
    }, []);

   
    return (
      <div>
 
     </div>
    );
}
 
export {VisorXML}

 