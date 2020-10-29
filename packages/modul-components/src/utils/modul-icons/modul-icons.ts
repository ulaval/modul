export enum ModulIconsCategory {
    Arrow = 'arrow',
    Audio = 'audio',
    Control = 'control',
    Document = 'document',
    File = 'file',
    Form = 'form',
    Image = 'image',
    Message = 'message',
    State = 'state',
    Text = 'text',
    Video = 'video'
}

export enum ModulIconName {
    AddCircleFilled = 'add-circle-filled',
    AddCircle = 'add-circle',
    ArrowDown = 'arrow--down',
    ArrowLeft = 'arrow--left',
    ArrowRight = 'arrow--right',
    ArrowUp = 'arrow--up',
    ArrowButtonDown = 'arrow-button--down',
    ArrowButtonLeft = 'arrow-button--left',
    ArrowButtonRight = 'arrow-button--right',
    ArrowButtonUp = 'arrow-button--up',
    ArrowHeadCircleRight = 'arrow-head-circle--right',
    ArrowHeadFilledDown = 'arrow-head-filled--down',
    ArrowHeadFilledLeft = 'arrow-head-filled--left',
    ArrowHeadFilledRight = 'arrow-head-filled--right',
    ArrowHeadFilledUp = 'arrow-head-filled--up',
    ArrowReturn = 'arrow-return',
    ArrowThinDown = 'arrow-thin--down',
    ArrowThinLeft = 'arrow-thin--left',
    ArrowThinRight = 'arrow-thin--right',
    ArrowThinUp = 'arrow-thin--up',
    Attachment = 'attachment',
    Avatar = 'avatar',
    Calendar = 'calendar',
    ChevronDown = 'chevron--down',
    ChevronLeft = 'chevron--left',
    ChevronRight = 'chevron--right',
    ChevronUp = 'chevron--up',
    Clock = 'clock',
    CloseClear = 'close-clear',
    CodeTag = 'code-tag',
    Compare = 'compare',
    CompletedFilled = 'completed-filled',
    ConfirmationWhiteFilled = 'confirmation-white-filled',
    Confirmation = 'confirmation',
    Delete = 'delete',
    Download = 'download',
    DragVertical = 'drag-vertical',
    Dragndrop = 'dragndrop',
    Edit = 'edit',
    EmailSend = 'email-send',
    Email = 'email',
    ErrorFilled = 'error-filled',
    ErrorWhiteFilled = 'error-white-filled',
    Error = 'error',
    Evaluation = 'evaluation',
    FileAccess = 'file-access',
    FileAudio = 'file-audio',
    FileCode = 'file-code',
    FileDefault = 'file-default',
    FileDwg = 'file-dwg',
    FileExcel = 'file-excel',
    FileFlash = 'file-flash',
    FileImage = 'file-image',
    FileMarkup = 'file-markup',
    FileMediaplayer = 'file-mediaplayer',
    FileOpenofficeBase = 'file-openoffice-base',
    FileOpenofficeCalc = 'file-openoffice-calc',
    FileOpenofficeDefault = 'file-openoffice-default',
    FileOpenofficeDraw = 'file-openoffice-draw',
    FileOpenofficeImpress = 'file-openoffice-impress',
    FileOpenofficeMath = 'file-openoffice-math',
    FileOpenofficeWritter = 'file-openoffice-writter',
    FilePdf = 'file-pdf',
    FilePowerpoint = 'file-powerpoint',
    FileQuicktime = 'file-quicktime',
    FileRealplayer = 'file-realplayer',
    FileText = 'file-text',
    FileVideo = 'file-video',
    FileVisio = 'file-visio',
    FileWord = 'file-word',
    FileZip = 'file-zip',
    FolderOpen = 'folder-open',
    Folder = 'folder',
    FullScreen = 'full-screen',
    GridFilled = 'grid-filled',
    Grid = 'grid',
    Grouping = 'grouping',
    HelpCircle = 'help-circle',
    Heraldry = 'heraldry',
    Hide = 'hide',
    Hint = 'hint',
    Home = 'Home',
    ImageSlideshow = 'image-slideshow',
    ImageSquare = 'image-square',
    Image1Filled = 'image1-filled',
    Image2Filled = 'image2-filled',
    InformationFilled = 'information-filled',
    InformationWhiteFilled = 'information-white-filled',
    Information = 'information',
    LeaveFullScreen = 'leave-full-screen',
    ListFilled = 'list-filled',
    List = 'list',
    Lock = 'lock',
    Logout = 'logout',
    MultimediaExternal = 'multimedia-external',
    MultimediaFilled = 'multimedia-filled',
    Multimedia = 'multimedia',
    NotAllowed = 'not-allowed',
    Notification = 'notification',
    Options = 'options',
    Panel = 'panel',
    Profile = 'profile',
    RemoveAssignation = 'remove-assignation',
    RemoveCircleFilled = 'remove-circle-filled',
    RemoveCircle = 'remove-circle',
    Replace = 'replace',
    RightAnswer = 'right-answer',
    RoleAssignation = 'role-assignation',
    Search = 'search',
    Show = 'show',
    Subtitle = 'subtitle',
    Text1 = 'text1',
    Text2 = 'text2',
    VideoFilled = 'video-filled',
    VideoSlideshow = 'video-slideshow',
    Video = 'video',
    WarningFilled = 'warning-filled',
    WarningWhiteFilled = 'warning-white-filled',
    Warning = 'warning',
    WrongAnswer = 'wrong-answer'
}


export interface ModulIcon {
    name: string;
    category?: ModulIconsCategory[];
    tag?: string[];
}

export const ModulIcons: ModulIcon[] = [
    {
        name: ModulIconName.AddCircleFilled,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.AddCircle,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowDown,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowLeft,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowRight,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowUp,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowButtonDown,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowButtonLeft,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowButtonRight,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowButtonUp,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowHeadCircleRight,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowHeadFilledDown,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowHeadFilledLeft,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowHeadFilledRight,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowHeadFilledUp,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowReturn,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowThinDown,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowThinLeft,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowThinRight,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ArrowThinUp,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Attachment,
        category: [
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.Avatar
    },
    {
        name: ModulIconName.Calendar,
        category: [
            ModulIconsCategory.Form
        ]
    },
    {
        name: ModulIconName.ChevronDown,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ChevronLeft,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ChevronRight,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ChevronUp,
        category: [
            ModulIconsCategory.Arrow,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Clock,
        category: [
            ModulIconsCategory.Form
        ]
    },
    {
        name: ModulIconName.CloseClear,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.CodeTag,
        category: [
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.Compare,
        category: [
            ModulIconsCategory.Control,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.CompletedFilled,
        category: [
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.ConfirmationWhiteFilled,
        category: [
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.Confirmation,
        category: [
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.Delete,
        category: [
            ModulIconsCategory.Form,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Download,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.DragVertical,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Dragndrop,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Edit,
        category: [
            ModulIconsCategory.Form,
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.EmailSend,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Email
    },
    {
        name: ModulIconName.ErrorFilled,
        category: [
            ModulIconsCategory.Form,
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.ErrorWhiteFilled,
        category: [
            ModulIconsCategory.Form,
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.Error,
        category: [
            ModulIconsCategory.Form,
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.Evaluation
    },
    {
        name: ModulIconName.FileAccess,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileAudio,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.FileCode,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.FileDefault,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileDwg,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileExcel,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileFlash,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Image,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.FileImage,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Image
        ]
    },
    {
        name: ModulIconName.FileMarkup,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.FileMediaplayer,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Image,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.FileOpenofficeBase,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileOpenofficeCalc,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileOpenofficeDefault,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileOpenofficeDraw,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileOpenofficeImpress,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileOpenofficeMath,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileOpenofficeWritter,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.FilePdf,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Image,
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.FilePowerpoint,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Image,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.FileQuicktime,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.FileRealplayer,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.FileText,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.FileVideo,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.FileVisio,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FileWord,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document,
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.FileZip,
        category: [
            ModulIconsCategory.File,
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FolderOpen,
        category: [
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.Folder,
        category: [
            ModulIconsCategory.Document
        ]
    },
    {
        name: ModulIconName.FullScreen,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.GridFilled
    },
    {
        name: ModulIconName.Grid
    },
    {
        name: ModulIconName.Grouping,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.HelpCircle
    },
    {
        name: ModulIconName.Heraldry
    },
    {
        name: ModulIconName.Hide,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Hint
    },
    {
        name: ModulIconName.Home,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ImageSlideshow,
        category: [
            ModulIconsCategory.Image
        ]
    },
    {
        name: ModulIconName.ImageSquare,
        category: [
            ModulIconsCategory.Image
        ]
    },
    {
        name: ModulIconName.Image1Filled,
        category: [
            ModulIconsCategory.Image
        ]
    },
    {
        name: ModulIconName.Image2Filled,
        category: [
            ModulIconsCategory.Image
        ]
    },
    {
        name: ModulIconName.InformationFilled,
        category: [
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.InformationWhiteFilled,
        category: [
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.Information,
        category: [
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.LeaveFullScreen,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.ListFilled
    },
    {
        name: ModulIconName.List
    },
    {
        name: ModulIconName.Lock
    },
    {
        name: ModulIconName.Logout,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.MultimediaExternal,
        category: [
            ModulIconsCategory.Image,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.MultimediaFilled,
        category: [
            ModulIconsCategory.Image,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.Multimedia,
        category: [
            ModulIconsCategory.Image,
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.NotAllowed,
        category: [
            ModulIconsCategory.Control,
            ModulIconsCategory.Form
        ]
    },
    {
        name: ModulIconName.Notification
    },
    {
        name: ModulIconName.Options,
        category: [
            ModulIconsCategory.Control,
            ModulIconsCategory.Form
        ]
    },
    {
        name: ModulIconName.Panel,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Profile
    },
    {
        name: ModulIconName.RemoveAssignation,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.RemoveCircleFilled,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.RemoveCircle,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Replace,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.RightAnswer,
        category: [
            ModulIconsCategory.State
        ]
    },
    {
        name: ModulIconName.RoleAssignation,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Search,
        category: [
            ModulIconsCategory.Control,
            ModulIconsCategory.Form
        ]
    },
    {
        name: ModulIconName.Show,
        category: [
            ModulIconsCategory.Control
        ]
    },
    {
        name: ModulIconName.Subtitle,
        category: [
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.Text1,
        category: [
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.Text2,
        category: [
            ModulIconsCategory.Text
        ]
    },
    {
        name: ModulIconName.VideoFilled,
        category: [
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.VideoSlideshow,
        category: [
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.Video,
        category: [
            ModulIconsCategory.Video,
            ModulIconsCategory.Audio
        ]
    },
    {
        name: ModulIconName.WarningFilled,
        category: [
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.WarningWhiteFilled,
        category: [
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.Warning,
        category: [
            ModulIconsCategory.State,
            ModulIconsCategory.Message
        ]
    },
    {
        name: ModulIconName.WrongAnswer,
        category: [
            ModulIconsCategory.State
        ]
    }
];

