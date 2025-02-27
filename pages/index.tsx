import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setIsExecutable] = useState('')

  const addressSubmittedHandler = (address: string) => {
    try {
      const key = new web3.PublicKey(address)
      setAddress(key.toBase58())

      const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

      connection.getBalance(key).then((balance) => {
        setBalance(balance / web3.LAMPORTS_PER_SOL)
      })

      connection.getAccountInfo(key).then((accountInfo) => {
        if (accountInfo?.executable === true) {
          setIsExecutable('Yep!')
        }
        else {
          setIsExecutable('Nope')
        }
      })
    } catch (error) {
      setAddress('')
      setBalance(0)
      setIsExecutable('')
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>Start Your Solana Journey</p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is it executable? ${isExecutable}`}</p>
      </header>
    </div>
  )
}

export default Home
