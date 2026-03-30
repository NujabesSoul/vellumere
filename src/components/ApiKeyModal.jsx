import { useState, useEffect } from 'react'
import { getApiKey, setApiKey } from '../services/api.js'

export default function ApiKeyModal({ isOpen, onClose }) {
  const [keyInput, setKeyInput] = useState('')
  const [existingKey, setExistingKey] = useState('')

  useEffect(() => {
    if (isOpen) {
      const current = getApiKey()
      setExistingKey(current)
      setKeyInput('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const maskKey = (key) => {
    if (!key || key.length < 12) return key
    return key.slice(0, 7) + '...' + key.slice(-4)
  }

  const handleSave = () => {
    setApiKey(keyInput.trim())
    onClose()
  }

  const handleClear = () => {
    setApiKey('')
    setExistingKey('')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">API Key</h3>
        <p className="modal-description">
          Stored in your browser only. Never sent anywhere except directly to Anthropic.
        </p>

        {existingKey && (
          <div className="modal-existing">
            <span className="modal-masked-key">{maskKey(existingKey)}</span>
            <button className="modal-clear" onClick={handleClear}>Clear key</button>
          </div>
        )}

        <input
          type="password"
          className="modal-input"
          value={keyInput}
          onChange={e => setKeyInput(e.target.value)}
          placeholder="sk-ant-..."
          autoFocus
        />

        <div className="modal-actions">
          <button className="modal-save" onClick={handleSave} disabled={!keyInput.trim()}>
            Save Key
          </button>
          <button className="modal-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>

        <p className="modal-note">
          Stored in localStorage. Not exactly a Medici vault, but it works.
        </p>
      </div>
    </div>
  )
}
