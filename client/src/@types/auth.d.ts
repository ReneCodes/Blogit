import * as React from 'react';

export type AuthContextType = {
	auth: null | AuthType;
	setAuth: React.Dispatch<React.SetStateAction<null>>;
	reload: boolean;
	setReload: React.Dispatch<React.SetStateAction<boolean>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

type AuthType = {
	createdAt: string;
	email: string;
	password: string;
	updatedAt: string;
	username: string;
	image: string;
	_id: string;
};
