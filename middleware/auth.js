﻿export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.authenticated) {
      return redirect('/posts/1')
    }
  }