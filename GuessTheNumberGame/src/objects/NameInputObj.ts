interface NameInputObjData {
    name: string;
    onNameSubmit: (name: string) => void;
}

export default class NameInputObj implements NameInputObjData {

    constructor(public name: string, public onNameSubmit: (name: string) => void) { }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (this.name.trim()) {
            this.onNameSubmit(this.name.trim());
        }
    };
}