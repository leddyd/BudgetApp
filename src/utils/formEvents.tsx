export function Warning({ msg }: { msg: string }) {
    return (
        <div className="alert alert-warning alert-dismissible fade show d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-circle"></i>
            {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}