import React, { ReactElement } from 'react'
import ReduxProvider from './ReduxProvider'


type ReduxKey = {
  reduxId: string
}

export default function withRedux<T>(Component: React.ComponentType<T & ReduxKey>){
  return function NewComponent(props: T){
    return (
      <ReduxProvider>
        <Component {...props} reduxId={new Date().getTime().toString()} />
      </ReduxProvider>
    )
  }
}
