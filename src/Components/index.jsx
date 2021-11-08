import React from "react";
import * as Validator from 'validatorjs';

class FormComp extends React.Component {
    state = {
        nama: '',
        email: '',
        tanggal_lahir: '',
        agama: '',
        error: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            nama: this.state.nama,
            email: this.state.email,
            tanggal_lahir: this.state.tanggal_lahir,
            agama: this.state.agama,
        }
        const rules = {
            nama: 'required',
            email: 'required|email',
            tanggal_lahir: 'required',
            agama: 'required',
        }
        let validation = new Validator(data, rules);
        validation.passes();
        
        let error = validation.errors.all();

        if (Object.entries(error).length !== 0){
            this.showError(error)
        }else{
            alert(
                ` 
                 nama: ${this.state.nama}
                 email: ${this.state.email}
                 tanggal lahir: ${this.state.tanggal_lahir}
                 agama: ${this.state.agama}`
            );
            this.setState({
                nama: '',
                email: '',
                tanggal_lahir: '',
                agama: '',
                error: '',
            })
        }
    }

    showError = (err) => {
        this.setState({error: err}, 
            () => console.log(this.state.error));
    }

    
    render() {
        return(
            <div style={{padding: '20px', textAlign:'center'}}>
                <form onSubmit={this.handleSubmit} style={{margin: 'auto', padding: '20px 30px', border:'solid 1px black', display:'inline-block', textAlign:'left'}}>
                    <h2>Formulir Biodata</h2>
                    <label>Nama</label><br/>
                    <input type="text" name="nama" placeholder="masukan nama" 
                            onChange={e => this.setState({nama: e.target.value},
                            () => console.log(this.state))} value={this.state.nama}/>
                    <br /><span style={{color:'red'}}>{this.state.error.nama}</span> <br />
                    <label>Email</label><br/>
                    <input type="email" name="email" placeholder="masukan email" value={this.state.email}
                            onChange={e => this.setState({email: e.target.value},
                            () => console.log(this.state))} />
                    <br /><span style={{color:'red'}}>{this.state.error.email}</span> <br />
                    <label>Tanggal Lahir</label><br/>
                    <input type="date" name="tanggal" value={this.state.tanggal_lahir}
                            onChange={e => this.setState({tanggal_lahir: e.target.value},
                            () => console.log(this.state))}/>
                    <br /><span style={{color:'red'}}>{this.state.error.tanggal_lahir}</span> <br />
                    <select name="agama" value={this.state.agama}
                            onChange={e => this.setState({agama: e.target.value},
                            () => console.log(this.state))}>
                        <option value="">pilih</option>
                        <option value="islam">Islam</option>
                        <option value="kristen">Kristen</option>
                        <option value="hindu">Hindu</option>
                        <option value="budha">Budha</option>
                    </select>
                    <br /><span style={{color:'red'}}>{this.state.error.agama}</span><br /> 
                    <input type="submit" name="submit" value="Daftar" />
                    <br/>
                </form>
            </div>
        )
    }
}

export default FormComp;