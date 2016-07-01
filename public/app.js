class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registered: false,
            email: null
        };
    }
    onSubmit(e) {
        e.preventDefault();
        var data = {
            name: this.refs.name.value,
            email: this.refs.email.value,
            line: this.refs.line.value,
            telp: this.refs.telp.value,
            cabang: this.refs.cabang.value,
        };

        axios.post('/daftar', {data})
            .then((response) => {
                if (response.data.success) {
                    alert('Berhasil mendaftar silakan cek email ' + data.email);
                    this.setState({registered: true, email: data.email});
                } else {
                    alert('Gagal mendaftar');
                    this.setState({registered: false});
                }
            });
    }
    render() {
        return (
            <div classtelp="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        {!this.state.registered ?
                            <form className="form" onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-group">
                                    <label for="email">Nama *</label>
                                    <input type="text" ref="name" className="form-control" id="name" placeholder="Nama" />
                                </div>
                                <div className="form-group">
                                    <label for="email">Email *</label>
                                    <input type="email" ref="email" className="form-control" id="email" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label for="line">ID LINE</label>
                                    <input type="text" ref="line" className="form-control" id="line" placeholder="@lineid" />
                                </div>
                                <div className="form-group">
                                    <label for="telp">No HP *</label>
                                    <input type="number" ref="telp" className="form-control" id="telp" placeholder="Nomor HP" />
                                </div>
                                <div className="form-group">
                                    <label for="cabang">Cabang Genneo</label>
                                    <input type="text" ref="cabang" className="form-control" id="cabang" placeholder="Riau" />
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" /> Saya menyetujui syarat dan ketentuan Genneo United
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-default form-control">Daftar</button>
                            </form>
                            : 
                            <div className="form">
                                <h1>🐴 Terima kasih telah mendaftar</h1>
                                <p>Silakan cek email 🐴 di {this.state.email}</p>
                            </div>}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));