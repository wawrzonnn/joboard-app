import * as React from 'react'
import styles from './SearchInput.module.scss'

export interface SearchInputProps {
  label?: string
  placeholder?: string
  id?: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  name?: string
  value?: string
  icon?: React.ReactNode
}

export const SearchInput = ({ label, placeholder, id, onChange, name, value, icon }: SearchInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{label}</label>
      <input className={styles.input} id={id} placeholder={placeholder} onChange={handleChange} name={name} value={value} />
      <span className={styles.icon}>{icon}</span>
    </div>
  )
}
