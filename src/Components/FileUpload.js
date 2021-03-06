import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import {FormControl} from 'react-bootstrap';
import Transaction from '../Models/Transaction'
var xlsx = require('xlsx');

export default class FileUpload extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            imageURL: '',
          };

      this.handleFile = this.handleFile.bind(this);
    }

    handleFile(file)
    {
        let props = this.props;
        let reader = new FileReader();
        reader.onloadend = function(e){
            let text = this.result;

            let trans = [];
            let index = 0;

            text.split("\n").forEach(line => {
                if(index != 0)
                {
                    let values = line.split(",");
                    let type = values[4];
                    let transDate = new Date(values[0]);
                    let postDate = new Date(values[1]);
                    let description = values[2];
                    let category = values[3];
                    let price = -1*Number(values[5]);

                    if(isNaN(price) || price < 0){
                        return;
                    }

                    trans.push(new Transaction(type, category, description, price, transDate, postDate));
                }

                index += 1;
        });
            props.onDataCompleted(trans);
        };

        reader.readAsText(file);
    }

    render() {
        return (
            <FormControl
                className="login-input"
                className="mr-sm-2"
                placeholder="Upload"
                type="file"
                onChange={(e) => this.handleFile(e.target.files[0])}
            />
        );
    }
}
