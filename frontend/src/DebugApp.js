import React from 'react';

// Absolute minimum test component
function DebugApp() {
  // Inline styles to avoid any CSS loading issues
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'red',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      TEST - If you see this, React is working!
    </div>
  );
}

export default DebugApp;
