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
	controls: [],
	width: 500,
	height: 500
}

export const buildWireframe = (key, ownerId, name, controls, width, height) => {
	return {
		key: key,
		name: name ? name : defaultWireframe.name,
		ownerId: ownerId,
		controls: controls ? controls : [],
		lastEdited: new Date(),
		width: width ? width : defaultWireframe.width,
		height: height ? height : defaultWireframe.height
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
		text: 'Unknwon',
		fontColor: '#000000',
		fontSize: 12,
		border: {
			thickness: 2,
			radius: 2,
			color: '#000000'
		}
	}
}

export const buildControl = (
	key,
	type,
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
	let r = {
		key: key,
		type: type,
		xCoordinate: xCoordinate ? xCoordinate : defaultControl.xCoordinate,
		yCoordinate: yCoordinate ? yCoordinate : defaultControl.yCoordinate,
		width: width ? width : defaultControl.width,
		height: height ? height : defaultControl.height,
		color: color ? color : defaultControl.color,
		text: text ? text : defaultControl.properties.text,
		fontColor: fontColor ? fontColor : defaultControl.properties.fontColor,
		fontSize: fontSize ? fontSize : defaultControl.properties.fontSize,
		border: {
			thickness: thickness
				? thickness
				: defaultControl.properties.border.thickness,
			radius: radius ? radius : defaultControl.properties.border.radius,
			color: borderColor
				? borderColor
				: defaultControl.properties.border.color
		},
		lastEdited: new Date()
	}
	return r
}
