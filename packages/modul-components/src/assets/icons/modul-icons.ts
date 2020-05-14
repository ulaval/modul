
export enum ModulIconsCategory {
    Arrow = 'arrow',
    Audio = 'audio',
    Control = 'control',
    Document = 'document',
    File = 'file',
    Form = 'form',
    Image = 'image',
    Video = 'video',
    Sate = 'state'
}

export interface ModulIcon {
    name: string;
    category?: ModulIconsCategory[];
    tag?: string[];
}

export const ModulIcons: ModulIcon[] = [
    {
        name: 'add-circle-filled',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'add-circle',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow--down',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow--left',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow--right',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow--up',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-button--down',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-button--left',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-button--right',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-button--up',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-head-circle--right',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-head-filled--down',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-head-filled--left',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-head-filled--right',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-head-filled--up',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-return',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-thin--down',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-thin--left',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-thin--right',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'arrow-thin--up',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'attachment',
        category: [
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'avatar'
    },
    {
        name: 'calendar',
        category: [
            ModulIconsCategory.Form
        ]
    },
    {
        name: 'chevron--down',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'chevron--left',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'chevron--right',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'chevron--up',
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'clock',
        category: [
            ModulIconsCategory.Form
        ]
    },
    {
        name: 'close-clear',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'code-tag'
    },
    {
        name: 'completed-filled',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'confirmation-white-filled',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'confirmation',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'delete',
        category: [
            ModulIconsCategory.Form,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'download',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'drag-veryical',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'dragndrop',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'edit',
        category: [
            ModulIconsCategory.Form,
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'email-send',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'email'
    },
    {
        name: 'error-filled',
        category: [
            ModulIconsCategory.Form,
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'error',
        category: [
            ModulIconsCategory.Form,
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'evaluation'
    },
    {
        name: 'file-access',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-audio',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'file-code',
        category: [
            ModulIconsCategory.File
        ]
    },
    {
        name: 'file-default',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-dwg',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-excel',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-flash',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Image,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'file-image',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Image
        ]
    },
    {
        name: 'file-markup',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-mediaplayer',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Image,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'file-openoffice-base',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-openoffice-calc',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-openoffice-default',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-openoffice-draw',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-openoffice-impress',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-openoffice-math',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-openoffice-writter',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-pdf',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Image
        ]
    },
    {
        name: 'file-powerpoint',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Image,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'file-quicktime',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'file-realplayer',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'file-text',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-video',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'file-visio',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-word',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'file-zip',
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'folder-open',
        category: [
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'folder',
        category: [
            ModulIconsCategory.Document
        ]
    },
    {
        name: 'full-screen',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'grid'
    },
    {
        name: 'grouping',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'heraldry'
    },
    {
        name: 'hide',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'hint'
    },
    {
        name: 'home',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'image-slideshow',
        category: [
            ModulIconsCategory.Image
        ]
    },
    {
        name: 'image-square',
        category: [
            ModulIconsCategory.Image
        ]
    },
    {
        name: 'image1-filled',
        category: [
            ModulIconsCategory.Image
        ]
    },
    {
        name: 'image2-filled',
        category: [
            ModulIconsCategory.Image
        ]
    },
    {
        name: 'information-filled',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'information-white-filled',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'information',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'leave-full-screen',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'list-filled'
    },
    {
        name: 'list'
    },
    {
        name: 'lock'
    },
    {
        name: 'logout',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'multimedia-external',
        category: [
            ModulIconsCategory.Image,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'multimedia-filled',
        category: [
            ModulIconsCategory.Image,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'multimedia',
        category: [
            ModulIconsCategory.Image,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'not-allowed',
        category: [
            ModulIconsCategory.Control,
            ModulIconsCategory.Form
        ]
    },
    {
        name: 'notification'
    },
    {
        name: 'options',
        category: [
            ModulIconsCategory.Control,
            ModulIconsCategory.Form
        ]
    },
    {
        name: 'panel',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'profile'
    },
    {
        name: 'remove-assignation',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'remove-circle-filled',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'remove-circle',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'replace',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'right-answer',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'role-assignation',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'search',
        category: [
            ModulIconsCategory.Control,
            ModulIconsCategory.Form
        ]
    },
    {
        name: 'show',
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: 'subtitle'
    },
    {
        name: 'text1'
    },
    {
        name: 'text2'
    },
    {
        name: 'video-filled',
        category: [
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'video-slideshow',
        category: [
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'video',
        category: [
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: 'warning-filled',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'warning-white-filled',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'warning',
        category: [
            ModulIconsCategory.Sate
        ]
    },
    {
        name: 'wrong-answer',
        category: [
            ModulIconsCategory.Sate
        ]
    }
]
