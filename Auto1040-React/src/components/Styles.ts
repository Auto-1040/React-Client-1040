export const boxStyle = {
    mt: 2,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    maxWidth: 400,
    mx: 'auto',
    maxHeight: '80vh',
    overflow: 'auto'
}

export const loginBoxStyle={
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    maxWidth: 400,
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  }


  

  export function stringAvatar(name: string) {
    return {
      alt: name,
      sx: {
        bgcolor: '#C62D21',
        m: 1,
      },
      children: `${name}`[0],
    };
  
  }
  