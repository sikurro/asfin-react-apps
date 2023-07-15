import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class ModalCreate extends Component {

    constructor() {
        super()

        this.state = {
            show: false,
            deskripsi: '',
            nominal: 0,
            tanggal: '',
            category: '',
        }
    }

    handleShow = () => {
        this.setState({ show: true, category: this.props.category })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        this.setState({ show: false })
    }

    tambahItem = () => {
        let data = {            
            deskripsi: this.state.deskripsi,
            nominal: parseFloat(this.state.nominal),
            tanggal: this.state.tanggal,
            category: this.state.category,
        }

        const fnTambahItem = this.props.action // fungsi dari app.js
        fnTambahItem(data)
        this.setState({ show: false })
    }

    render() {
        return (
            <>
                <button className={this.props.variant} onClick={this.handleShow}>
                    {this.props.text} <i className={this.props.icon}></i>
                </button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalheading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label className="form-label">Deskripsi</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="deskripsi"
                                name="deskripsi"
                                value={this.state.deskripsi}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nominal</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="nominal"
                                name="nominal"
                                value={this.state.nominal}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tanggal</label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="tanggal"
                                name="tanggal"
                                value={this.state.tanggal}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <input
                                type="hidden"
                                className="form-control"
                                placeholder="category"
                                name="category"
                                value={this.state.category}
                                onChange={this.handleChange}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={this.props.variant} onClick={this.tambahItem}>
                            Simpan
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalCreate