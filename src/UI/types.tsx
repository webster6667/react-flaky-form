export interface InputElementsClassNameProps {
    input: string,
    label: string,
    error: string
}

export interface BemComponent {
    className?: string,
    children?: any
}

export interface BemComponentContainer {
    className?: string,
    children: any
}