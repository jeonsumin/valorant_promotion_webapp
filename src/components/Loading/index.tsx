type Props = {
  on: boolean;
};
export const Loading = (props: Props) => {
  const { on } = props;

  /**
   *
   * @keyframes spin {
   *   0% {transform: rotate(0deg);}
   *   100% { transform: rotate(360deg);}
   * }
   *
   *
   */

  if (!on) return null;

  return (
    <div
      className='loading'
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        className='loading_circle'
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className='loading_bar'
          style={{
            border: '10px solid #f3f3f3',
            borderTop: '10px solid #3498db',
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            animation: 'spin 2s linear infinite',
          }}
        ></div>
      </div>
    </div>
  );
};
