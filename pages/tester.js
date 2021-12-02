import * as React from 'react';
import {useEffect, useState} from 'react';
import mixpanel from 'mixpanel-browser';
import Papa from 'papaparse'

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

const Tester =() => {
    const handleChange = event => {
        setcsvfile(event.target.files[0])
    }

    const [ csvfile, setcsvfile ] = useState({});

    const importCSV = () => {
        Papa.parse(csvfile, {
            complete: updateData,
            header: true
        });
    };

    function updateData(result) {
        var data = result.data.map(mapper=>mapper);
        console.log(data);
    }

  return (
      <div className="App">
          <h2>Import CSV File!</h2>
          <input
              className="csv-input"
              type="file"
              ref={input => {
                  const filesInput = input;
              }}
              name="file"
              placeholder={null}
              onChange={handleChange}
          />
          <p />
          <button onClick={importCSV}> Upload now!</button>
      </div>
  );
}

export default Tester;