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


function stringToColor(string: String) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  

  export function stringAvatar(name: string) {
    return {
      alt: name,
      sx: {
        bgcolor: stringToColor(name),
        m: 1,
      },
      children: `${name}`[0],
    };
  
  }
  