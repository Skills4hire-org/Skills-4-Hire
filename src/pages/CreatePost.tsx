import FormSubmitButton from '@/components/buttons/FormSubmitButton'
import FormTextArea from '@/components/form-fields/FormTextArea'
import Container from '@/components/global/Container'
import ProfileImage from '@/components/global/ProfileImage'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, ImageIcon, Paperclip, Plus } from 'lucide-react'
import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { toast } from 'sonner'

export default function CreatePost() {
  const [input, setInput] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [formData, setFormData] = useState({
    post: '',
    photo: '',
    attachment: '',
  })
  const [showInput, setShowInput] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    if (field === 'budget') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }
  const fileRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (
    field: string,
    file: FileList | null,
    types: string[],
  ) => {
    if (!file) {
      return
    }
    if (!types.includes(file[0].type) && fileRef.current) {
      fileRef.current.value = ''
      return toast('File type is not acceptable.')
    }
    setFormData({ ...formData, [field]: file })
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    const newKeyword = input.trim()
    if (!newKeyword) return

    if (!keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setShowInput(false)
    }

    setInput('')
  }
  const handleAddKeyword = () => {
    const newKeyword = input.trim()
    if (!keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setShowInput(false)
    }
    setInput('')
  }
  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title="Create Post" />
      <Container className="pt-1 max-w-2xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 md:gap-4">
            <ProfileImage noStatus size="size-12 md:size-16" />

            <p className="text-xl md:text-2xl font-medium">Joshua Friday</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <FormTextArea
              name="post"
              placeholder="Post your latest work or service"
              value={formData.post}
              handleInputChange={handleInputChange}
              className="text-sm md:text-base p-2 py-4 h-66 min-h-[48px]"
              rows={3}
              required
            />
            <div className="w-full">
              <div className="space-y-1">
                <span className="text-sm md:text-base font-medium block">
                  Keywords
                </span>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Add up to 5 keywords relevant to your post.
                </p>
              </div>

              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 mb-2">
                  {keywords.map((keyword) => (
                    <div
                      key={keyword}
                      className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="text-xs font-bold cursor-pointer text-primary/80 hover:text-primary"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3">
                {showInput ? (
                  <div className="relative max-w-xs">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type keyword and press Enter"
                      className="w-full border border-input rounded-md px-3 h-9 text-xs md:text-sm shadow-xs focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-[1px] outline-none pr-14"
                    />
                    <button
                      onClick={handleAddKeyword}
                      className="bg-primary text-white rounded-r-md w-12 font-medium absolute top-0 right-0 h-full text-xs md:text-sm cursor-pointer hover:primary/80  disabled:opacity-50"
                      disabled={!input}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowInput(true)}
                    className="text-primary font-medium flex items-center gap-1 text-xs md:text-sm outline outline-primary  px-3 py-1.5 rounded-full hover:bg-primary/10 cursor-pointer hover:outline-2 disabled:opacity-50"
                    disabled={keywords.length == 5}
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" /> Add Keyword
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground justify-start ml-0 mt-6 md:mt-8">
              <Label
                htmlFor="photo"
                className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
              >
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  multiple
                  ref={fileRef}
                  accept="image/png, image/jpeg"
                  onChange={(e) =>
                    handleFileChange('photo', e.target.files, [
                      'image/png',
                      'image/jpeg',
                    ])
                  }
                  className="hidden"
                />
                <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">Photo</span>
                <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-1.5">
                  {formData.photo ? (
                    <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                </span>
              </Label>

              <Label
                htmlFor="attachment"
                className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
              >
                <Input
                  id="attachment"
                  name="attachment"
                  type="file"
                  multiple
                  ref={fileRef}
                  accept=".pdf, .doc, .docx"
                  onChange={(e) =>
                    handleFileChange('attachment', e.target.files, [
                      '.pdf',
                      '.doc',
                      '.docx',
                    ])
                  }
                  className="hidden"
                />
                <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">Attachment</span>
                <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-1.5">
                  {formData.attachment ? (
                    <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                </span>
              </Label>
            </div>
            <div className="border-t pt-2 md:pt-4 flex justify-end">
              <FormSubmitButton
                size="sm"
                submitting={false}
                text="Post"
                texting="Posting"
                className="px-4 md:px-8 text-sm md:text-base"
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}
