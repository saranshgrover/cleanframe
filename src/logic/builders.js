export const defaultUser = {
  firstName: 'Unknwon',
  lastName: 'Unknwon',
  email: '',
  wireframes: [],
  isAdmin: false
}

export const buildUser = (
  firstName,
  lastName,
  email,
  wireframes,
  isAdmin,
  id
) => {
  return {
    firstName: firstName ? firstName : defaultUser.firstName,
    lastName: lastName ? lastName : defaultUser.lastName,
    email: email ? email : defaultUser.email,
    wireframes: wireframes ? wireframes : wireframes,
    isAdmin: isAdmin ? isAdmin : defaultUser.isAdmin,
    id: id,
    lastEdited: new Date()
  }
}

export const defaultWireframe = {
  key: -1,
  name: 'Unknown',
  ownerFirst: '',
  ownerLast: '',
  ownerId: '',
  editing: false,
  selected: -1,
  controls: []
}

export const buildWireframe = (
  key,
  ownerId,
  name,
  controls,
  selected,
  editing
) => {
  return {
    key: key,
    name: name ? name : defaultWireframe.name,
    ownerId: ownerId,
    editing: editing ? editing : defaultWireframe.editing,
    selected: selected ? selected : defaultWireframe.selected,
    controls: controls ? controls : defaultControl,
    lastEdited: new Date()
  }
}

export const defaultControl = {
  key: -1,
  type: 'container',
  xCoordinate: 0,
  yCoordinate: 0,
  width: 50,
  height: 50,
  color: '#ffffff',
  properties: {
    text: '',
    fontColor: '#000000',
    fontSize: 12,
    border: {
      thickness: 2,
      radius: 2,
      color: '#f7f7f7'
    }
  }
}

export const buildControl = (
  key,
  xCoordinate,
  yCoordinate,
  width,
  height,
  color,
  text,
  fontColor,
  fontSize,
  thickness,
  radius,
  borderColor
) => {
  return {
    key: key,
    xCoordinate: xCoordinate,
    yCoordinate: yCoordinate,
    width: width ? width : defaultControl.width,
    height: height ? height : defaultControl.height,
    color: color ? color : defaultControl.color,
    text: text ? text : defaultControl.text,
    fontColor: fontColor ? fontColor : defaultControl.fontColor,
    fontSize: fontSize ? fontSize : defaultControl.fontSize,
    border: {
      thickness: thickness ? thickness : defaultControl.border.thickness,
      radius: radius ? radius : defaultControl.border.radius,
      color: borderColor ? borderColor : defaultControl.border.color
    },
    lastEdited: new Date()
  }
}
