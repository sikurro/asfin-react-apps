import './App.css';
import React, { Component } from 'react'
import ModalCreate from './components/ModalCreate';
import { wait } from '@testing-library/user-event/dist/utils';

class App extends Component {

  constructor() {
    super();

    this.state = {
      sisaUang: 0,
      persentaseUang: 0,
      pemasukanUang: 0,
      pengeluaranUang: 0,
      transactionIn: 0,
      transactionOut: 0,
      history: [],
    }
  }

  tambahItem = (item) => {  
    let newData = [...this.state.history, item]
    this.hitung(newData)
  }

  hitung = (histories) => {
    let dataUangIn = histories.filter( item => item.category === 'IN' )
    let totalUangIn = dataUangIn.reduce((total, item) => total + item.nominal, 0)
    
    let dataUangOut = histories.filter( item => item.category === 'OUT' )
    let totalUangOut = dataUangOut.reduce((total, {nominal}) => total + nominal, 0) // using destructuring

    this.setState({
      transactionIn: dataUangIn.length,
      transactionOut: dataUangOut.length,
      pemasukanUang: totalUangIn,
      pengeluaranUang: totalUangOut,
      sisaUang: totalUangIn - totalUangOut,
      persentaseUang: (totalUangIn-totalUangOut)/totalUangIn * 100,
      history: histories
    })
  }

  componentDidMount() {
    if (this.state.history.length > 0) {      
      this.hitung(this.state.history)
    }
  }

  render() {
    return (
      <div>
        <div className='container py-5'>
          {/* begin header */}
          <div className='row mb-4'>
            <div className='col-12 text-center'>
              <h1 className='fw-bold text-center'>ASFIN APPS</h1>
              <hr className='w-75 mx-auto' />
              <h2 className='fw-bold'>Rp. {this.state.sisaUang},-</h2>
              <span className='title-md'>Sisa uang kamu tersisa {this.state.persentaseUang}% lagi</span>
            </div>
          </div>
          {/* end header */}

          <div className='row mb-4'>
            {/* begin card */}
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper-in mb-1'>
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className='title-sm'>Pemasukan</span>
                <h3 className='fw-bold'>Rp. {this.state.pemasukanUang},-</h3>
                <span className='title-sm text-ungu fw-bold'>{this.state.transactionIn}</span><span className='title-sm'> Transaksi</span>
              </div>
            </div>
            {/* end card */}

            {/* begin card */}
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper-out mb-1'>
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className='title-sm'>Pengeluaran</span>
                <h3 className='fw-bold'>Rp. {this.state.pengeluaranUang},-</h3>
                <span className='title-sm text-ungu fw-bold'>{this.state.transactionOut}</span><span className='title-sm'> Transaksi</span>
              </div>
            </div>
            {/* end card */}

          </div>

          {/* begin history */}
          <div className='row mb-3'>
            <div className='col-12 d-flex justify-content-between align-items-center'>
              <h4 className='fw-bold'>Riwayat Transaksi</h4>
              <div className='wrapper-button d-flex'>
                <ModalCreate action={this.tambahItem} category="IN" variant="button btn-ungu px-3 py-2 me-2" text="Pemasukan" icon="bi bi-plus-circle-fill" modalheading="Tambah Pemasukan" />
                <ModalCreate action={this.tambahItem} category="OUT" variant="button btn-pink px-3 py-2" text="Pengeluaran" icon="bi bi-dash-circle-fill" modalheading="Tambah Pengeluaran" />                
              </div>
            </div>
          </div>
          {/* end history */}
          
          {/* alert jika belum ada history */}
          {this.state.history.length < 1 && <h1>belum ada transaksi</h1>}

          {/* item history */}
          {this.state.history.map((item, index) => (
            <div key={index} className='row mb-2'>
              <div className='col-12 d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                  <div className={item.category === "IN" ? "icon-wrapper-in" : "icon-wrapper-out"}>
                    <i className={item.category === "IN" ? "bi bi-wallet2" : "bi bi-bag-dash"}></i>
                  </div>

                  <div className='transaction ms-3 d-flex flex-column'>
                    <h6>{item.deskripsi}</h6>
                    <span className='title-sm'>{item.tanggal}</span>
                  </div>
                </div>

                <h5 className={item.category === "IN" ? "text-money-in" : "text-money-out"}>Rp. {item.nominal},-</h5>
              </div>
            </div>
          ))}
          {/* end item history */}
          
        </div>
      </div>
    )
  }
}
export default App;
