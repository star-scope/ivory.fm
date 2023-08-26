import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Player from '../pages/api/components/player'
import '../src/app/globals.css'

export default function Home() {
  return (
    <>
      <div>
        <img src="../images/grain.png" className="backgroundGrain"></img>
        <img src="../images/piano.png" className="piano"></img>
        <header>
          <h1 className="start">IVORY.FM</h1>
          <h1 className="end">BY CYBRLITE</h1>
        </header>
        <footer>
          <div className="start"><Player></Player></div>
          <img className="end" src="/spotify.svg"></img>
        </footer>
      </div>
    </>
  );
}

